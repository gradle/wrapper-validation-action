// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXREUCENTRY_H
#define GITINDEXREUCENTRY_H
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

#include "../include/oid.h"
#include "../include/index.h"

using namespace node;
using namespace v8;

class GitIndexReucEntry;

struct GitIndexReucEntryTraits {
  typedef GitIndexReucEntry cppClass;
  typedef git_index_reuc_entry cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_reuc_entry **dest, git_index_reuc_entry *src) {
     Nan::ThrowError("duplicate called on GitIndexReucEntry which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_index_reuc_entry *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitIndexReucEntry : public
  NodeGitWrapper<GitIndexReucEntryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexReucEntryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                  

  private:
    GitIndexReucEntry()
      : NodeGitWrapper<GitIndexReucEntryTraits>(
           "A new GitIndexReucEntry cannot be instantiated."
       )
    {}
    GitIndexReucEntry(git_index_reuc_entry *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexReucEntryTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexReucEntry();
                                      static NAN_METHOD(Mode);
    static NAN_METHOD(Oid);
    static NAN_METHOD(Path);

    struct AddBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * path;
      int ancestor_mode;
      const git_oid * ancestor_id;
      bool ancestor_idNeedsFree;
      int our_mode;
      const git_oid * our_id;
      bool our_idNeedsFree;
      int their_mode;
      const git_oid * their_id;
      bool their_idNeedsFree;
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

    struct FindBaton {
      int error_code;
      const git_error* error;
      size_t * at_pos;
      git_index * index;
      const char * path;
    };
    class FindWorker : public Nan::AsyncWorker {
      public:
        FindWorker(
            FindBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindBaton *baton;
    };

    static NAN_METHOD(Find);

    static NAN_METHOD(GetByIndex);

    static NAN_METHOD(GetByPath);

    struct RemoveBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      size_t n;
    };
    class RemoveWorker : public Nan::AsyncWorker {
      public:
        RemoveWorker(
            RemoveBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RemoveWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RemoveBaton *baton;
    };

    static NAN_METHOD(Remove);
};

#endif
