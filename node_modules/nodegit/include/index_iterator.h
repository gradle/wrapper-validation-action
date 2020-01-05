// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXITERATOR_H
#define GITINDEXITERATOR_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/index.h"
#include "../include/index_entry.h"
// Forward declaration.
struct git_index_iterator {
};

using namespace node;
using namespace v8;

class GitIndexIterator;

struct GitIndexIteratorTraits {
  typedef GitIndexIterator cppClass;
  typedef git_index_iterator cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_iterator **dest, git_index_iterator *src) {
     Nan::ThrowError("duplicate called on GitIndexIterator which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_index_iterator *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_index_iterator_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitIndexIterator : public
  NodeGitWrapper<GitIndexIteratorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexIteratorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

         

  private:
    GitIndexIterator()
      : NodeGitWrapper<GitIndexIteratorTraits>(
           "A new GitIndexIterator cannot be instantiated."
       )
    {}
    GitIndexIterator(git_index_iterator *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexIteratorTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexIterator();
         
    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_index_iterator * iterator_out;
      git_index * index;
    };
    class CreateWorker : public Nan::AsyncWorker {
      public:
        CreateWorker(
            CreateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateBaton *baton;
    };

    static NAN_METHOD(Create);

    static NAN_METHOD(Next);
};

#endif
