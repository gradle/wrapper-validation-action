// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXNAMEENTRY_H
#define GITINDEXNAMEENTRY_H
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
#include <git2/sys/index.h>
}

#include "../include/typedefs.h"

#include "../include/index.h"

using namespace node;
using namespace v8;

class GitIndexNameEntry;

struct GitIndexNameEntryTraits {
  typedef GitIndexNameEntry cppClass;
  typedef git_index_name_entry cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_name_entry **dest, git_index_name_entry *src) {
     Nan::ThrowError("duplicate called on GitIndexNameEntry which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_index_name_entry *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitIndexNameEntry : public
  NodeGitWrapper<GitIndexNameEntryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexNameEntryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                 

  private:
    GitIndexNameEntry()
      : NodeGitWrapper<GitIndexNameEntryTraits>(
           "A new GitIndexNameEntry cannot be instantiated."
       )
    {}
    GitIndexNameEntry(git_index_name_entry *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexNameEntryTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexNameEntry();
                     static NAN_METHOD(Ancestor);
    static NAN_METHOD(Ours);
    static NAN_METHOD(Theirs);

    struct AddBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * ancestor;
      const char * ours;
      const char * theirs;
    };
    class AddWorker : public Nan::AsyncWorker {
      public:
        AddWorker(
            AddBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddBaton *baton;
    };

    static NAN_METHOD(Add);

    struct ClearBaton {
      int error_code;
      const git_error* error;
      git_index * index;
    };
    class ClearWorker : public Nan::AsyncWorker {
      public:
        ClearWorker(
            ClearBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ClearWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ClearBaton *baton;
    };

    static NAN_METHOD(Clear);

    static NAN_METHOD(Entrycount);

    static NAN_METHOD(GetByIndex);
};

#endif
