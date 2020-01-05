// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXCONFLICTITERATOR_H
#define GITINDEXCONFLICTITERATOR_H
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
struct git_index_conflict_iterator {
};

using namespace node;
using namespace v8;

class GitIndexConflictIterator;

struct GitIndexConflictIteratorTraits {
  typedef GitIndexConflictIterator cppClass;
  typedef git_index_conflict_iterator cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_conflict_iterator **dest, git_index_conflict_iterator *src) {
     Nan::ThrowError("duplicate called on GitIndexConflictIterator which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_index_conflict_iterator *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_index_conflict_iterator_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitIndexConflictIterator : public
  NodeGitWrapper<GitIndexConflictIteratorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexConflictIteratorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

           

  private:
    GitIndexConflictIterator()
      : NodeGitWrapper<GitIndexConflictIteratorTraits>(
           "A new GitIndexConflictIterator cannot be instantiated."
       )
    {}
    GitIndexConflictIterator(git_index_conflict_iterator *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexConflictIteratorTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexConflictIterator();
           
    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_index_conflict_iterator * iterator_out;
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
